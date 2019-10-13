console.log('hello world')

fetch('http://localhost:3000/v1/todos')
  .then(resp => resp.json())
  .then(json => {
    console.log(json)
    document.body.innerHTML = `
      <pre>
${JSON.stringify(json, null, 2)}
      </pre>
    `
  })
