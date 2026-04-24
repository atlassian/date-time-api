// CANARY_HB_NPM_PREINSTALL_X7K2M - plain JS test
console.log('CANARY_HB_NPM_PREINSTALL_X7K2M');
console.log('canary JS test file executed successfully');

describe('canary js', function() {
  it('should execute top-level code', function() {
    if (true !== true) throw new Error('unreachable');
  });
});
