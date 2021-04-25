const express = require('express');
const tagsRouter = express.Router();

const { getAllTags, getPostsByTagName } = require('../db')

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");
    next();
})

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
    console.log(tags)
    res.send({
        tags
    })
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    const { tagName } = req.params;
    // read the tagname from the params
    try {
      const postsWithTag = await getPostsByTagName(tagName);
      res.send({postsWithTag});
      next();
      // use our method to get posts by tag name from the db
      // send out an object to the client { posts: // the posts }
    } catch ({ name, message }) {
      next({ name, message });
      // forward the name and message to the error handler
    }
  });

module.exports = tagsRouter;