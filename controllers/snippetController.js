const Snippet = require('../models/snippet');

exports.getDashboard = async (req, res) => {
    try {
        const snippets = await Snippet.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.render('dashboard', { user: req.user, snippets });
    } catch (err) {
        console.error('Error fetching snippets:', err);
        res.status(500).send('Server Error');
    }
};

exports.createSnippet = async (req, res) => {
    const { title, code, language } = req.body;
    try {
        const newSnippet = new Snippet({
            title,
            code,
            language,
            userId: req.user.id
        });
        await newSnippet.save();
        res.redirect('/dashboard');
    } catch (err) {
        console.error('Error creating snippet:', err);
        res.status(500).send('Server Error');
    }
};

// Delete a snippet
exports.deleteSnippet = async (req, res) => {
    try {
        // Ensure user can only delete their own snippets
        await Snippet.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).send('Error deleting snippet');
    }
};