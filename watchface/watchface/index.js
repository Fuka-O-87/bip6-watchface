WatchFace({
  build() {
    // ========================================
    // 背景
    // ========================================

    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: 'background.png',
    })


    // ========================================
    // センサー
    // ========================================

    const time = hmSensor.createSensor(hmSensor.id.TIME)
    const step = hmSensor.createSensor(hmSensor.id.STEP)
    const heart = hmSensor.createSensor(hmSensor.id.HEART)


    // ========================================
    // 時計用数字
    // ========================================

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


    // ========================================
    // 時計
    // ========================================

    const timeWidget = hmUI.createWidget(hmUI.widget.IMG_TIME, {
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


    // ========================================
    // 日付用数字
    // ========================================

    const dateDigits = [
      'date_0.png',
      'date_1.png',
      'date_2.png',
      'date_3.png',
      'date_4.png',
      'date_5.png',
      'date_6.png',
      'date_7.png',
      'date_8.png',
      'date_9.png',
    ]

    // MM.DD
    // 全体幅 約144px
    // 画面中央に配置

    const dateY = 278

    const dateWidgets = [
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 123,
        y: dateY,
        src: 'date_0.png',
      }),

      hmUI.createWidget(hmUI.widget.IMG, {
        x: 152,
        y: dateY,
        src: 'date_0.png',
      }),

      hmUI.createWidget(hmUI.widget.IMG, {
        x: 181,
        y: dateY,
        src: 'date_dot.png',
      }),

      hmUI.createWidget(hmUI.widget.IMG, {
        x: 210,
        y: dateY,
        src: 'date_0.png',
      }),

      hmUI.createWidget(hmUI.widget.IMG, {
        x: 239,
        y: dateY,
        src: 'date_0.png',
      }),
    ]


    // ========================================
    // 日付画像更新
    // ========================================

    const updateDate = () => {
      const month =
        time.month < 10
          ? '0' + time.month
          : String(time.month)

      const day =
        time.day < 10
          ? '0' + time.day
          : String(time.day)

      dateWidgets[0].setProperty(hmUI.prop.MORE, {
        src: dateDigits[Number(month[0])],
      })

      dateWidgets[1].setProperty(hmUI.prop.MORE, {
        src: dateDigits[Number(month[1])],
      })

      dateWidgets[3].setProperty(hmUI.prop.MORE, {
        src: dateDigits[Number(day[0])],
      })

      dateWidgets[4].setProperty(hmUI.prop.MORE, {
        src: dateDigits[Number(day[1])],
      })
    }

    updateDate()


    // ========================================
    // 歩数
    // ========================================

    const stepText = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20,
      y: 335,
      w: 350,
      h: 35,

      color: 0xffffff,
      text_size: 22,

      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,

      text: `STEP ${step.current}`,
    })


    // ========================================
    // 心拍
    // ========================================

    const heartText = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20,
      y: 385,
      w: 350,
      h: 35,

      color: 0xffffff,
      text_size: 22,

      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,

      text:
        heart.last > 0
          ? `BPM ${heart.last}`
          : 'BPM --',
    })


    // ========================================
    // 詳細画面は最初は非表示
    // ========================================

    stepText.setProperty(
      hmUI.prop.VISIBLE,
      false
    )

    heartText.setProperty(
      hmUI.prop.VISIBLE,
      false
    )


    // ========================================
    // 日付をまとめて表示 / 非表示
    // ========================================

    const setDateVisible = (visible) => {
      for (let i = 0; i < dateWidgets.length; i++) {
        dateWidgets[i].setProperty(
          hmUI.prop.VISIBLE,
          visible
        )
      }
    }


    // ========================================
    // ホーム / 詳細 切り替え
    // ========================================

    let detailVisible = false

    hmUI.createWidget(hmUI.widget.BUTTON, {
      // ロゴ部分
      x: 110,
      y: 65,
      w: 170,
      h: 160,

      text: '',

      normal_src: 'tap_transparent.png',
      press_src: 'tap_transparent.png',

      click_func: () => {
        detailVisible = !detailVisible

        // ホーム画面
        timeWidget.setProperty(
          hmUI.prop.VISIBLE,
          !detailVisible
        )

        setDateVisible(
          !detailVisible
        )

        // 詳細画面
        stepText.setProperty(
          hmUI.prop.VISIBLE,
          detailVisible
        )

        heartText.setProperty(
          hmUI.prop.VISIBLE,
          detailVisible
        )
      },
    })


    // ========================================
    // 歩数更新
    // ========================================

    step.addEventListener(
      hmSensor.event.CHANGE,
      () => {
        stepText.setProperty(
          hmUI.prop.MORE,
          {
            text: `STEP ${step.current}`,
          }
        )
      }
    )


    // ========================================
    // 心拍更新
    // ========================================

    heart.addEventListener(
      heart.event.LAST,
      () => {
        heartText.setProperty(
          hmUI.prop.MORE,
          {
            text:
              heart.last > 0
                ? `BPM ${heart.last}`
                : 'BPM --',
          }
        )
      }
    )


    // ========================================
    // 日付更新
    // ========================================

    time.addEventListener(
      time.event.MINUTEEND,
      () => {
        updateDate()
      }
    )
  },
})