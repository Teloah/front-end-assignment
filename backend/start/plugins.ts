import registerBaconComponent from '@snowdog/front-end-recruitment-test-submodule'
import View from '@ioc:Adonis/Core/View'
import currency from 'currency.js'

registerBaconComponent(View)

View.global('formatCurrency', function (amount) {
  return currency(amount, { symbol: '$ ' }).format()
})
