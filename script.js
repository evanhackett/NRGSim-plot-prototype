const fileInput = document.getElementById('fileInput')

let data = null;

fileInput.addEventListener('change', e => {
  const file = fileInput.files[0]

  const reader = new FileReader()

  reader.onload = e => {
    data = parse_csv(reader.result)
    // plot(data)
    load_buttons(Object.keys(data))
  }

  reader.readAsText(file)

})

const parse_csv = data => {
  const lines = data.split('\n')
  const keys = lines[0].split(',')
  const just_data = lines.slice(1)

  return R.transpose(just_data
          .map(line => line.split(',')))
          .reduce((acc, curr, index) => {
            acc[keys[index]] = curr
            return acc
          }, {})

}

const plot = (data, key) => {
  TESTER = document.getElementById('tester');

  Plotly.newPlot( TESTER, [{
    x: R.range(data[key].length),
    y: data[key],
    name: key
  }], {
	    margin: { t: 0 },
      xaxis: {title: 'time interval'},
      yaxis: {title: key}
    }
  )
}


const load_buttons = keys => {
  const buttons = keys.map(key => {
    const button = document.createElement('button')
    button.innerHTML = key
    button.addEventListener('click', e => {
      plot(data, key)
    })
    return button
  })

  buttons.forEach(b => {
    document.getElementById('buttons').appendChild(b)
  })
}
