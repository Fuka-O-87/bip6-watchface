WatchFace({
  build() {
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: 'background.png',
    })

    const timeDigits = [
      '0.png',
      '1.png',
      '2.png',
      '3.png',
      '4.png',
      '5.png',
      '6.png',
      '7.png',
      '8.png',
      '9.png',
    ]

    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      hour_zero: 1,

      hour_startX: 45,
      hour_startY: 320,
      hour_array: timeDigits,
      hour_space: 4,

      hour_unit_sc: 'colon.png',
      hour_unit_tc: 'colon.png',
      hour_unit_en: 'colon.png',

      hour_align: hmUI.align.LEFT,

      minute_follow: 1,
      minute_array: timeDigits,
      minute_space: 4,
    })
  },
})