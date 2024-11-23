const validateUrl = (req, res, next) => {
  const { original_url } = req.body;
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  if (!original_url || !regex.test(original_url)) {
      return res.status(400).json({ error: 'Invalid URL' });
  }
  next();
};

module.exports = validateUrl;
