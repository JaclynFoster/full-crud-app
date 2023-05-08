let patterns = [
  {
    id: 1,
    name: 'snake',
    imageURL:
      'https://drive.google.com/uc?export=view&id=1EfgSwaURRwvC14wk4OmmAq875W-ldftR',
    patternURL:
      'https://amigurum.com/2020/10/amigurumi-snake-free-pattern.html',
    price: 20
  },
  {
    id: 2,
    name: 'puppy',
    imageURL:
      'https://drive.google.com/uc?export=view&id=14qeWMileMOKSzch6O0wfpIEsQMG1jRgy',
    patternURL: 'https://www.cuddlystitchescraft.com/free-crochet-dog-pattern/',
    price: 35
  },
  {
    id: 3,
    name: 'giraffe',
    imageURL:
      'https://drive.google.com/uc?export=view&id=1G4_jrFRRPUZEhH3t0AhuFykA6BvJrAyQ',
    patternURL:
      'https://www.cuddlystitchescraft.com/free-crochet-giraffe-pattern/',
    price: 45
  },
  {
    id: 4,
    name: 'bee',
    imageURL:
      'https://drive.google.com/uc?export=view&id=1ZMnNl0Gs9MexQbqT7JlVspjKUWYA4kLz',
    patternURL:
      'https://www.graceandyarn.com/2019/05/free-crochet-bee-pattern.html',
    price: 60
  },
  {
    id: 5,
    name: 'jellyfish',
    imageURL:
      'https://drive.google.com/uc?export=view&id=12wQaAVgSKraBGXR3etra0cNf6dqb0EhK',
    patternURL:
      'https://www.theblueelephants.com/jenni-the-jellyfish-free-crochet-jellyfish-pattern/',
    price: 25
  }
]

let patternID = 6

const getPatterns = (req, res) => {
  res.status(200).send(patterns)
}

const makePattern = (req, res) => {
  const { name, imageURL, patternURL, price } = req.body
  let newPattern = {
    name,
    imageURL,
    patternURL,
    price,
    id: patternID
  }
  patterns.push(newPattern)
  res.status(200).send(patterns)
  patternID++
}

const deletePattern = (req, res) => {
  const { id } = req.params
  let patternIndex = patterns.findIndex(pattern => pattern.id === +id)
  patterns.splice(patternIndex, 1)
  res.status(200).send(patterns)
}

const updatePattern = (req, res) => {
  const { name, imageURL, patternURL, price, id } = req.body
  let modalUpdate = {
    name,
    price,
    imageURL,
    patternURL,
    id
  }
  patterns = patterns.map((obj, index) => {
    if (obj.id === id) {
      return modalUpdate
    } else {
      return obj
    }
  })

  res.status(200).send(patterns)
}

module.exports = { getPatterns, makePattern, deletePattern, updatePattern }
