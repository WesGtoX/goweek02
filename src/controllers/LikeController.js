const Tweet = require('../models/Tweet');

module.exports = {
    async store(req, res) {
        const tweet = await Tweet.findById(req.params.id);
    }
}