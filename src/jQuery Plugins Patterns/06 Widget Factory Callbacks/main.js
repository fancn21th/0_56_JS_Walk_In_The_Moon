(function ($) {
  $.widget('custom.progressbar', {
    options: {
      value: 0
    },
    _create: function () {
      this.options.value = this._constrain(this.options.value)
      this.element.addClass('progressbar')
      this.refresh()
    },
    _setOption: function (key, value) {
      if (key === 'value') {
        value = this._constrain(value)
      }
      this._super(key, value)
    },
    _setOptions: function (options) {
      this._super(options)
      this.refresh()
    },
    refresh: function () {
      var progress = this.options.value + '%'
      this.element.text(progress)
      if (this.options.value == 100) {
        this._trigger('complete', null, {
          value: 100
        })
      }
    },
    _constrain: function (value) {
      if (value > 100) {
        value = 100
      }
      if (value < 0) {
        value = 0
      }
      return value
    }
  })
}(jQuery))

var bar = $('<div></div>')
  .appendTo('body')
  .progressbar({
    complete: function () {
      alert( 'Callbacks are great!' )
    }
  })
  .bind('progressbarcomplete', function (event, data) {
    alert('Events bubble and support many handlers for extreme flexibility.')
    alert('The progress bar value is ' + data.value)
  })
  .progressbar('option', 'value', 20)

// Get the current value.
console.log(bar.progressbar('option', 'value'))

// Update the value.
bar.progressbar('option', 'value', 100)

// Get the current value again.
console.log(bar.progressbar('option', 'value'))
