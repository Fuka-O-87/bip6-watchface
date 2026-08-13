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
      hour_startY: 344,
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

    const dateY = 290

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
    // ラベル画像
    // ========================================

    const stepLabel = hmUI.createWidget(hmUI.widget.IMG, {
      x: 16,
      y: stepY,
      src: 'label_step.png',
    })

    const heartLabel = hmUI.createWidget(hmUI.widget.IMG, {
      x: 16,
      y: heartY,
      src: 'label_bpm.png',
    })

    const calorieLabel = hmUI.createWidget(hmUI.widget.IMG, {
      x: 16,
      y: calorieY,
      src: 'label_cal.png',
    })

    const batteryLabel = hmUI.createWidget(hmUI.widget.IMG, {
      x: 16,
      y: batteryY,
      src: 'label_bat_percent.png',
    })

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


    const stepDigitWidgets =
      createDigitWidgets(6, stepY)

    const heartDigitWidgets =
      createDigitWidgets(3, heartY)

    const calorieDigitWidgets =
      createDigitWidgets(5, calorieY)

    const batteryDigitWidgets =
      createDigitWidgets(3, batteryY)


    // ========================================
    // 心拍未取得表示
    // ========================================

    const heartNoData = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 165,
      y: heartY,
      w: 205,
      h: 36,

      color: 0xffffff,
      text_size: 20,

      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,

      text: '--',
    })


    // ========================================
    // 詳細画面のタップ領域
    // ========================================

    const stepClick = hmUI.createWidget(
      hmUI.widget.IMG_CLICK,
      {
        x: 10,
        y: stepY,
        w: 370,
        h: 36,
        src: 'tap_transparent.png',
        type: hmUI.data_type.STEP,
      }
    )

    const heartClick = hmUI.createWidget(
      hmUI.widget.IMG_CLICK,
      {
        x: 10,
        y: heartY,
        w: 370,
        h: 36,
        src: 'tap_transparent.png',
        type: hmUI.data_type.HEART,
      }
    )

    const calorieClick = hmUI.createWidget(
      hmUI.widget.IMG_CLICK,
      {
        x: 10,
        y: calorieY,
        w: 370,
        h: 36,
        src: 'tap_transparent.png',
        type: hmUI.data_type.CAL,
      }
    )

    const batteryClick = hmUI.createWidget(
      hmUI.widget.IMG_CLICK,
      {
        x: 10,
        y: batteryY,
        w: 370,
        h: 36,
        src: 'tap_transparent.png',
        type: hmUI.data_type.BATTERY,
      }
    )

    const detailClicks = [
      stepClick,
      heartClick,
      calorieClick,
      batteryClick,
    ]


    // ========================================
    // 状態
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

      // ラベル画像を避けた数値表示領域
      const valueAreaX = 165
      const valueAreaW = 205

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
    // 更新関数
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


    function updateCalorie() {
      updateDigitRow(
        calorieDigitWidgets,
        calorie.current,
        5,
        calorieY,
        detailVisible
      )
    }


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
    // 詳細画面表示 / 非表示
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

      // タップ領域
      for (
        let i = 0;
        i < detailClicks.length;
        i++
      ) {
        detailClicks[i].setProperty(
          hmUI.prop.VISIBLE,
          visible
        )
      }

      // 数字
      updateStep()
      updateHeart()
      updateCalorie()
      updateBattery()
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