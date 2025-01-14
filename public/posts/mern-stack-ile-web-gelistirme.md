![CI Süreci Şeması](https://almablog-media.s3.ap-south-1.amazonaws.com/MERN_Stack_9437df2ba9_62af1dd3fc.png)

MERN Stack, modern web geliştirme dünyasında popülerliğini hızla artıran bir teknolojiler bütünüdür. **MongoDB**, **Express.js**, **React.js** ve **Node.js**’den oluşan bu stack, hem ön uç hem de arka uç geliştirme için güçlü bir altyapı sunar. Bu rehberde, MERN Stack kullanarak bir web uygulamasının temel yapısını oluşturacak ve adım adım detaylı bir geliştirme süreci izlenecektir.

## MERN Stack Nedir?

MERN Stack, dört ana teknolojiden oluşur:

1. **MongoDB**: JSON benzeri doküman yapısı ile verileri NoSQL olarak depolayan çok yönlü bir veritabanı.
2. **Express.js**: Node.js ile entegre çalışan minimal bir backend framework'ü.
3. **React.js**: Dinamik ve etkileşimli kullanıcı arayüzleri oluşturmanıza olanak tanıyan bir JavaScript kütüphanesi.
4. **Node.js**: Sunucu tarafında JavaScript çalışmasını sağlayan çok yönlü bir çalışma ortamı.

Bu teknolojiler, tam bir uygulama geliştirme döngüsünü tek bir programlama diliyle (JavaScript) gerçekleştirebilmenizi sağlar.

## Gerekli Araçlar ve Kurulum

### Araçların Yüklenmesi

Projeye başlamadan önce aşağıdaki yazılımları yüklediğinizden emin olun:

-   **Node.js**: [Node.js](https://nodejs.org) web sitesinden indirilip yüklenebilir.
-   **MongoDB**: Yerel bir kurulum veya [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) gibi bulut tabanlı bir çözüm.
-   **npm veya yarn**: Node.js ile birlikte gelen paket yöneticisi.
-   **Bir metin editörü**: [Visual Studio Code](https://code.visualstudio.com/) tavsiye edilir.

### Proje Yapılandırması

Proje klasörünü oluşturun ve gerekli dizinleri organize edin:

```bash
mkdir mern-app
cd mern-app
```

### Backend Kurulumu

### 1. Node.js ve Express Ayarları

Backend’i kurmak için Node.js ve Express.js kullanacağız. Gerekli paketleri yüklemek için şu komutları çalıştırın:

```bash
mkdir backend
cd backend
npm init -y
npm install express mongoose dotenv cors
```

#### Backend Dosya Yapısı

Proje dosyalarını organize etmek için aşağıdaki yapıyı oluşturun:

```
backend/
|-- server.js
|-- config/
|   |-- db.js
|-- models/
|   |-- User.js
|-- routes/
|   |-- userRoutes.js
```

![CI Süreci Şeması](https://www.datocms-assets.com/48294/1671537942-mern-stack-1-mern-stack.png?auto=format)

#### Veritabanı Bağlantısı

MongoDB’ye bağlantıyı kurmak için **`config/db.js`** dosyasını oluşturun:

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Bağlantısı: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Hata: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
```

**`server.js`** dosyasında bu bağlantıyı kullanın:

```javascript
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Basit bir route
app.get("/", (req, res) => {
    res.send("API Çalışıyor");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor.`));
```

### 2. Kullanıcı Modeli ve Route

**`models/User.js`**:

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
```

**`routes/userRoutes.js`**:

```javascript
const express = require("express");
const router = express.Router();

const User = require("../models/User");

// Kullanıcı listesi API
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Sunucu hatası." });
    }
});

module.exports = router;
```

Bu route’u **`server.js`** dosyasına ekleyin:

```javascript
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
```

### Frontend Kurulumu

### 1. React Projesinin Oluşturulması

```bash
npx create-react-app frontend
cd frontend
npm install axios react-router-dom
```

### 2. Kullanıcı Listesi Bileşeni

**`src/App.js`** dosyasına şu kodu ekleyin:

```javascript
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="App">
            <h1>Kullanıcılar Listesi</h1>
            {users.length === 0 ? (
                <p>Yükleniyor...</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
```
