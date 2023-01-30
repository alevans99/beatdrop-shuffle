const userProgress= {}

for (let i = 0; i < 5; i++) {

  userProgress[`level${i + 1}`] = {
    bronze: false,
    silver: false,
    gold: false
  }
}


export default userProgress