const mongoose = require('mongoose');

// Kết nối MongoDB (Không cần các tùy chọn useNewUrlParser và useUnifiedTopology nữa)
mongoose.connect('mongodb://localhost:27017/webshop')
  .then(() => console.log("Kết nối MongoDB thành công!"))
  .catch((err) => console.log("Lỗi kết nối MongoDB:", err));

module.exports = mongoose;
