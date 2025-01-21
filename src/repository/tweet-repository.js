const Tweet = require("../models/tweet");

class TweetRepository {
  async create(data) {
    try {
      const tweet = await Tweet.create(data);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }

  // this function will only show the id of the comment but not the whole comment. Inorder to populate it, we will use .populate() method
  async get(id) {
    try {
      const tweet = await Tweet.findById(id);
      return tweet;
    } catch (error) {
      throw error;
    }
  }

  // this function will pupulate the comment along with the tweet
  async getWithComment(id) {
    try {
      const tweet = await Tweet.findById(id)
        .populate({ path: "comments" })
        .lean(); // .lean() function will avoid the creation of mongoose object and the object will act like a normal java script object.
      return tweet;
    } catch (error) {
      throw error;
    }
  }

  async update(tweetId, data) {
    try {
      //const tweet = await Tweet.findByIdAndUpdate(tweetId, data); // this will not return the latest updated data
      const tweet = await Tweet.findByIdAndUpdate(tweetId, data, { new: true });
      return tweet;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      await Tweet.findByIdAndRemove(id);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getAll(offset, limit) {
    try {
      const tweet = await Tweet.find().skip(2).limit(3);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TweetRepository;
