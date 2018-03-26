import wepy from 'wepy'

export default class common extends wepy.mixin {
  data = {
    currentPrice: ''
  };
  methods = {
  };
  onLoad() {
    console.log('mixin onLoad')
  }
}
