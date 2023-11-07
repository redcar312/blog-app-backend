

const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(blog => {
        sum += Number(blog.likes)
    });
    return sum
}

const favoriteBlog = (blogs) => {
    let maxLikes = 0;
    let favoriteBlog
    blogs.forEach(blog => {
        if(blog.likes > maxLikes) {
        maxLikes = Number(blog.likes)
        favoriteBlog = {...blog}
        }
    })

    return favoriteBlog
}

const mostBlogs = (blogs) => {
    const authors = new Map()
    let maxVal = 0
    let maxAuthor = ""
    
   for(i = 0; i < blogs.length; i++) {
         if(authors.get(blogs[i].author)) {
            let val = authors.get(blogs[i].author)
            authors.set(blogs[i].author, val += 1)
            if(val > maxVal) {
                maxVal = val
                maxAuthor = blogs[i].author
            }
         } else {
            authors.set(blogs[i].author, 1)
            if(1 > maxVal) {
                maxVal = 1
                maxAuthor = blogs[i].author
            }
         }      


        }     
  

   let authorObj = {
        author:maxAuthor,
        amount:maxVal
   }
   return authorObj
}

const mostLikes = (blogs) => {
    const writers = new Map()
    let maxLikes = 0
    let maxAuthor = 0
        for(i = 0; i < blogs.length; i++){
            if(writers.get(blogs[i].author)){
                let val = writers.get(blogs[i].author)
                writers.set(blogs[i].author, val += blogs[i].likes)
                if(val > maxLikes) {
                    maxLikes = val
                    maxAuthor = blogs[i].author
                }
            } else {
                writers.set(blogs[i].author, blogs[i].likes)
                if(blogs[i].likes > maxLikes){
                    maxVal = blogs[i].likes
                    maxAuthor = blogs[i].author
                }
            }
        }


    

    let resObj = {
        author:maxAuthor,
        likes:maxLikes
    }

    return resObj

} 






module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    'env': {
      'commonjs': true,
      'es2021': true,
      'node': true,
      'jest': true,
    },}