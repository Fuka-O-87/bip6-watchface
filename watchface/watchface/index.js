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
    const calorie = hmSensor.createSensor(hmSensor.id.CALORIE)
    const battery = hmSensor.createSensor(hmSensor.id.BATTERY)


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
    // 小さい数字
    // 日付・詳細画面で共用
    // ========================================

    const smallDigits = [
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
    // 日付 MM.DD
    // ========================================

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


    function updateDate() {
      const month =
        time.month < 10
          ? '0' + time.month
          : String(time.month)

      const day =
        time.day < 10
          ? '0' + time.day
          : String(time.day)

      dateWidgets[0].setProperty(hmUI.prop.MORE, {
        src: smallDigits[Number(month[0])],
      })

      dateWidgets[1].setProperty(hmUI.prop.MORE, {
        src: smallDigits[Number(month[1])],
      })

      dateWidgets[3].setProperty(hmUI.prop.MORE, {
        src: smallDigits[Number(day[0])],
      })

      dateWidgets[4].setProperty(hmUI.prop.MORE, {
        src: smallDigits[Number(day[1])],
      })
    }

    updateDate()


    // ========================================
    // 詳細画面の行位置
    // ========================================

    const stepY = 290
    const heartY = 330
    const calorieY = 370
    const batteryY = 410


    // ========================================
    // ラベル作成
    // ========================================

    function createLabel(text, y) {
      return hmUI.createWidget(hmUI.widget.TEXT, {
        x: 20,
        y: y,
        w: 90,
        h: 36,

        color: 0xffffff,
        text_size: 17,

        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
        text_style: hmUI.text_style.NONE,

        text: text,
      })
    }


    const stepLabel = createLabel('STEP', stepY)
    const heartLabel = createLabel('BPM', heartY)
    const calorieLabel = createLabel('CAL', calorieY)
    const batteryLabel = createLabel('BAT%', batteryY)

    const detailLabels = [
      stepLabel,
      heartLabel,
      calorieLabel,
      batteryLabel,
    ]


    // ========================================
    // 数字ウィジェット作成
    // ========================================

    function createDigitWidgets(count, y) {
      const widgets = []

      for (let i = 0; i < count; i++) {
        widgets.push(
          hmUI.createWidget(hmUI.widget.IMG, {
            x: 0,
            y: y,
            src: 'date_0.png',
          })
        )
      }

      return widgets
    }


    // 歩数：最大6桁
    const stepDigitWidgets =
      createDigitWidgets(6, stepY)

    // 心拍：最大3桁
    const heartDigitWidgets =
      createDigitWidgets(3, heartY)

    // カロリー：最大5桁
    const calorieDigitWidgets =
      createDigitWidgets(5, calorieY)

    // バッテリー：最大3桁
    const batteryDigitWidgets =
      createDigitWidgets(3, batteryY)


    // ========================================
    // 心拍未取得表示
    // ========================================

    const heartNoData = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 120,
      y: heartY,
      w: 240,
      h: 36,

      color: 0xffffff,
      text_size: 20,

      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,

      text: '--',
    })


    // ========================================
    // 詳細画面状態
    // ========================================

    let detailVisible = false


    // ========================================
    // 数字列描画
    // ========================================

    function updateDigitRow(
      widgets,
      value,
      maxDigits,
      y,
      visible
    ) {
      // いったん全部非表示
      for (let i = 0; i < widgets.length; i++) {
        widgets[i].setProperty(
          hmUI.prop.VISIBLE,
          false
        )
      }

      if (!visible) {
        return
      }

      let number = Math.round(Number(value))

      if (!Number.isFinite(number) || number < 0) {
        number = 0
      }

      const text = String(number)

      const digitWidth = 28
      const gap = 2

      // 左のラベルを避けた数値領域
      const valueAreaX = 115
      const valueAreaW = 255

      const visibleCount =
        Math.min(text.length, maxDigits)

      const totalWidth =
        visibleCount * digitWidth +
        (visibleCount - 1) * gap

      const startX =
        valueAreaX +
        Math.floor(
          (valueAreaW - totalWidth) / 2
        )

      for (let i = 0; i < visibleCount; i++) {
        const sourceIndex =
          text.length - visibleCount + i

        const digit =
          Number(text[sourceIndex])

        widgets[i].setProperty(
          hmUI.prop.MORE,
          {
            x: startX + i * (digitWidth + gap),
            y: y,
            src: smallDigits[digit],
          }
        )

        widgets[i].setProperty(
          hmUI.prop.VISIBLE,
          true
        )
      }
    }


    // ========================================
    // 歩数更新
    // ========================================

    function updateStep() {
      updateDigitRow(
        stepDigitWidgets,
        step.current,
        6,
        stepY,
        detailVisible
      )
    }


    // ========================================
    // 心拍更新
    // ========================================

    function updateHeart() {
      if (!detailVisible) {
        for (
          let i = 0;
          i < heartDigitWidgets.length;
          i++
        ) {
          heartDigitWidgets[i].setProperty(
            hmUI.prop.VISIBLE,
            false
          )
        }

        heartNoData.setProperty(
          hmUI.prop.VISIBLE,
          false
        )

        return
      }

      if (heart.last > 0) {
        heartNoData.setProperty(
          hmUI.prop.VISIBLE,
          false
        )

        updateDigitRow(
          heartDigitWidgets,
          heart.last,
          3,
          heartY,
          true
        )
      } else {
        for (
          let i = 0;
          i < heartDigitWidgets.length;
          i++
        ) {
          heartDigitWidgets[i].setProperty(
            hmUI.prop.VISIBLE,
            false
          )
        }

        heartNoData.setProperty(
          hmUI.prop.VISIBLE,
          true
        )
      }
    }


    // ========================================
    // カロリー更新
    // ========================================

    function updateCalorie() {
      updateDigitRow(
        calorieDigitWidgets,
        calorie.current,
        5,
        calorieY,
        detailVisible
      )
    }


    // ========================================
    // バッテリー更新
    // ========================================

    function updateBattery() {
      updateDigitRow(
        batteryDigitWidgets,
        battery.current,
        3,
        batteryY,
        detailVisible
      )
    }


    // ========================================
    // 日付表示 / 非表示
    // ========================================

    function setDateVisible(visible) {
      for (
        let i = 0;
        i < dateWidgets.length;
        i++
      ) {
        dateWidgets[i].setProperty(
          hmUI.prop.VISIBLE,
          visible
        )
      }
    }


    // ========================================
    // 詳細表示 / 非表示
    // ========================================

    function setDetailVisible(visible) {
      detailVisible = visible

      // ラベル
      for (
        let i = 0;
        i < detailLabels.length;
        i++
      ) {
        detailLabels[i].setProperty(
          hmUI.prop.VISIBLE,
          visible
        )
      }

      if (visible) {
        updateStep()
        updateHeart()
        updateCalorie()
        updateBattery()
      } else {
        updateStep()
        updateHeart()
        updateCalorie()
        updateBattery()
      }
    }


    // ========================================
    // 初期状態
    // ========================================

    setDetailVisible(false)


    // ========================================
    // ロゴタップ
    // ========================================

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 110,
      y: 65,
      w: 170,
      h: 160,

      text: '',

      normal_src: 'tap_transparent.png',
      press_src: 'tap_transparent.png',

      click_func: () => {
        const nextState = !detailVisible

        // ホーム
        timeWidget.setProperty(
          hmUI.prop.VISIBLE,
          !nextState
        )

        setDateVisible(
          !nextState
        )

        // 詳細
        setDetailVisible(
          nextState
        )
      },
    })


    // ========================================
    // センサー更新イベント
    // ========================================

    step.addEventListener(
      hmSensor.event.CHANGE,
      () => {
        updateStep()
      }
    )

    heart.addEventListener(
      heart.event.LAST,
      () => {
        updateHeart()
      }
    )

    calorie.addEventListener(
      hmSensor.event.CHANGE,
      () => {
        updateCalorie()
      }
    )

    battery.addEventListener(
      hmSensor.event.CHANGE,
      () => {
        updateBattery()
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