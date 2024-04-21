Component({

  properties: {

    visible: {
      type: Boolean,
      value: false,
    }

  },

  methods: {

    show: function() {
      if (this.data.visible) {
        setTimeout(() => {
          this.setData({
            displaying: true,
          })
        }, 500);
        // this.animate('.navigable-page-tile', [
        //   { scale: [1, 1], rotate: 0, ease: 'ease-out'  },
        //   { scale: [1.5, 1.5], rotate: 45, ease: 'ease-in', offset: 0.9},
        //   { scale: [2, 2], rotate: 90 },
        // ], 5000, function () {
        //   this.clearAnimation('.block', function () {
        //     console.log("清除了.block上的所有动画属性")
        //   })
        // }.bind(this))
      }
    },

  }
})
