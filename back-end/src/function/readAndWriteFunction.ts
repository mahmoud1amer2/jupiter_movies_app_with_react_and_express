// const fs = require('fs')
import fs from 'fs'

export const getMovies = ():any[] => {
  return JSON.parse(fs.readFileSync('movies-db.json', 'utf-8'))
}

export const saveMovies = (movies:any[]):void => {
  fs.writeFileSync('movies-db.json', JSON.stringify(movies, null, 3))
}



