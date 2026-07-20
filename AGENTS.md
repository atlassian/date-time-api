# Agent notes for date-time-api

## Commit conventions

Conventional Commits, lowercase, no trailing period: `fix: ...`, `feat: ...`, `test: ...`, `chore: ...`.

## Testing

- `npm test` / `npm run test:coverage` run the suite under **both** `en-US` and `en-GB`
  locales (`test:en-US`, `test:en-GB` in `package.json`). This exists because bugs in this
  library have historically only reproduced under non-US locales (e.g. dd/mm/yyyy date
  parsing) and were invisible to a single-locale CI run. When adding a test that depends on
  locale-sensitive formatting, either make the assertion locale-independent or assert
  explicitly per-locale (don't rely on the runtime's default locale via `getLocale()`).
- `test:coverage` runs `npm run build` first — it does **not** go through the `test` script,
  so it does not pick up npm's `pretest` hook automatically. If you touch `test:coverage`,
  keep the explicit `npm run build &&` prefix or CI's dist-smoke tests
  (`src/index.dist.test.ts`) will fail with `Cannot find module '../dist/bundle.cjs'`.
- CI (`.github/workflows/ci.yml`) runs `typecheck`, `lint`, then `test:coverage` directly.
  There is no separate CI step that runs plain `test`, so `test:coverage` is the only thing
  that actually exercises the en-GB locale run in CI — don't let it silently drop back to a
  single locale.

## Release process

There is no automated versioning (no semantic-release/changesets). Releasing is manual:

1. **Bump the version as part of the same PR/branch as the change**, not as a separate
   follow-up after merge (this is the established convention — see PR #34, which merged the
   fix and its version bump commit together):

   ```bash
   npm version patch --no-git-tag-version   # or minor/major as appropriate
   git add package.json package-lock.json
   git commit -m "chore: bump version to X.Y.Z"
   git push
   ```

2. **After the PR is merged to `main`**, tag the actual merge commit (not the PR branch's
   local commit — the SHA can change on squash/rebase merges) and push the tag:

   ```bash
   git checkout main && git pull origin main
   git tag -a vX.Y.Z -m vX.Y.Z
   git push origin vX.Y.Z
   ```

   This step matters because `.github/workflows/release.yml`'s last step is
   `gh release create "$(git describe --tags --abbrev=0)" --generate-notes` — it names the
   GitHub Release after the nearest tag reachable from `main`'s HEAD. Skip pushing the tag
   and it reuses the previous release's tag.

3. **Manually trigger the Release workflow**: GitHub → Actions → "Release" → "Run workflow"
   on `main`. It runs `npm ci`, fetches an npm publish token via
   `atlassian-labs/artifact-publish-token` (already wired up, no action needed), runs
   `npm publish --userconfig .npmrc-public` (publishes whatever version is in `package.json`
   on `main` — hence step 1 must land first), then creates the GitHub Release from the tag
   pushed in step 2.
