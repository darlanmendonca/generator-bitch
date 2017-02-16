angular
  .module('<%= applicationSlug %>')
  .config(PromisesConfig)

function PromisesConfig($qProvider) {
  $qProvider.errorOnUnhandledRejections(false)
}
