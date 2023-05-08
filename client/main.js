let formContainer = document.querySelector('#form-container')
let patternContainer = document.querySelector('#pattern-container')
let imageInput = document.querySelector('#image')
let nameInput = document.querySelector('#name')
let patternInput = document.querySelector('#pattern')
let submitBtn = document.querySelector('#submit-btn')
let priceInput = document.querySelector('#price')
let modal = document.querySelector('#modal')

const baseURL = `http://localhost:4500`

const showPatterns = pattern => {
  let editBtn = document.createElement('button')
  let deleteBtn = document.createElement('button')
  let patternCard = document.createElement('div')
  patternCard.classList.add('pattern-card')
  editBtn.textContent = 'Edit'

  deleteBtn.textContent = 'Delete'
  deleteBtn.onclick = () => {
    deletePattern(pattern.id)
  }
  patternCard.innerHTML = `
    <img src=${pattern.imageURL} class="pattern-img"/>
    <h3 class="pattern-name">${pattern.name}</h3>
    <h4>Price: ${pattern.price}</h4>
    <a target="_blank" href="${pattern.patternURL}">Pattern Link</a>`
  editBtn.onclick = () => {
    openModal(pattern)
  }
  patternCard.appendChild(editBtn)
  patternCard.appendChild(deleteBtn)
  patternContainer.appendChild(patternCard)
}

const getPatterns = () => {
  axios
    .get(`${baseURL}/patterns`)
    .then(response => {
      patternContainer.textContent = ''
      for (let i = 0; i < response.data.length; i++) {
        showPatterns(response.data[i])
      }
    })
    .catch(error => {
      console.log('Error', error)
    })
}
getPatterns()

const createPattern = e => {
  e.preventDefault()
  axios
    .post(`${baseURL}/makePattern`, {
      name: nameInput.value,
      price: priceInput.value,
      imageURL: imageInput.value,
      patternURL: patternInput.value
    })
    .then(response => {
      ;(imageInput.value = ''),
      (nameInput.value = ''),
      (priceInput.value = ''),
      (patternInput.value = '')
      getPatterns()
      console.log(response.data)
    })
    .catch(error => {
      console.log('Error', error)
    })
}

formContainer.addEventListener('submit', createPattern)

const deletePattern = id => {
  axios
    .delete(`${baseURL}/deletePattern/${id}`)
    .then(response => {
      getPatterns()
      console.log(response.data)
    })
    .catch(error => {
      console.log('Error', error)
    })
}

const updatePattern = valueObj => {
  axios
    .put(`${baseURL}/updatePattern/${valueObj.id}`, { ...valueObj })
    .then(response => {
      getPatterns()
      console.log(response.data)
    })
    .catch(error => {
      console.log('Error', error)
    })
}

const openModal = patternObj => {
  let modalContainer = document.createElement('div')
  let modalNameInput = document.createElement('input')
  let modalPriceInput = document.createElement('input')
  let modalImageInput = document.createElement('input')
  let modalPatternInput = document.createElement('input')
  let modalBtn = document.createElement('button')
  modalContainer.style.display = 'block'
  modalNameInput.placeholder = 'Enter name...'
  modalPriceInput.placeholder = 'Enter price...'
  modalImageInput.placeholder = 'Enter image url...'
  modalPatternInput.placeholder = 'Enter pattern url...'
  modalBtn.textContent = 'Submit'
  modalNameInput.value = patternObj.name
  modalPriceInput.value = patternObj.price
  modalImageInput.value = patternObj.imageURL
  modalPatternInput.value = patternObj.patternURL
  modalContainer.appendChild(modalNameInput)
  modalContainer.appendChild(modalPriceInput)
  modalContainer.appendChild(modalImageInput)
  modalContainer.appendChild(modalPatternInput)
  modalContainer.appendChild(modalBtn)
  modal.appendChild(modalContainer)
  modalBtn.addEventListener('click', () => {
    let valueObj = {
      name: modalNameInput.value,
      price: modalPriceInput.value,
      imageURL: modalImageInput.value,
      patternURL: modalPatternInput.value,
      id: patternObj.id
    }
    updatePattern(valueObj)
    modalNameInput.value = ''
    modalPriceInput.value = ''
    modalImageInput.value = ''
    modalPatternInput.value = ''
    modalContainer.style.display = 'none'
  })
}
