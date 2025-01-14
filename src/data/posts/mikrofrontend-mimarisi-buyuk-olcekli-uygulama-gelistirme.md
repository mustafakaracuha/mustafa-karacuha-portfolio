![CI Süreci Şeması](https://micro-frontends.org/ressources/diagrams/organisational/monolith-frontback-microservices.png)

## Mikrofrontend Mimarisi ile Büyük Ölçekli Uygulama Geliştirme

Mikrofrontend mimarisi, modern yazılım geliştirme süreçlerinde büyük ölçekli uygulamaları daha modüler ve yönetilebilir hale getirmek için kullanılan bir yaklaşımdır. Bu yazıda mikrofrontend mimarisinin temellerine, avantajlarına ve uygulama araçlarına değineceğiz.


### Mikrofrontend Nedir?

Mikrofrontend, mikroservis mimarisinden ilham alan bir yaklaşımdır. Temel olarak, büyük ve monolitik frontend projelerinin, bağımsız olarak geliştirilip dağıtılabilen küçük parçalara bölünmesini ifade eder. Her bir mikrofrontend, farklı bir ekip tarafından geliştirilebilir ve bağımsız olarak dağıtılabilir.


### Mikrofrontend Mimarisi Neden Tercih Edilmeli?

### Avantajlar:

1. **Bağımsız Geliştirme:**

    - Ekipler, belirli bir mikrofrontend üzerinde çalışarak diğer ekiplerden bağımsız şekilde geliştirme yapabilir.

2. **Esneklik ve Teknoloji Çeşitliliği:**

    - Farklı mikrofrontend'lerde farklı teknolojiler kullanılabilir. Örneğin, bir parça React ile geliştirilirken, diğer bir parça Angular kullanılabilir.

3. **Hızlı Dağıtım:**

    - Parçalar bağımsız olduğu için, her biri ayrı ayrı dağıtılabilir. Bu, geliştirme ve güncelleme sürecini hızlandırır.

4. **Sorun İzolasyonu:**
    - Bir mikrofrontend'de oluşan bir hata, diğer mikrofrontend'leri etkilemez. Bu da hata ayıklamayı kolaylaştırır.


![CI Süreci Şeması](https://micro-frontends.org/ressources/video/model-store-0.gif)


### Mikrofrontend Uygulama Yöntemleri

### 1. **iFrame Kullanımı:**

-   Mikrofrontend'ler iFrame'ler aracılığıyla entegre edilir. Ancak, iFrame kullanımı genellikle performans ve kullanıcı deneyimi açısından sınırlamalara sahiptir.

### 2. **Web Components:**

-   Web bileşenleri, her mikrofrontend'in bağımsız bir bileşen olarak çalışmasını sağlar. Tarayıcı desteği ile birlikte daha esnek bir çözüm sunar.

### 3. **Module Federation (Webpack):**

-   Webpack'in "Module Federation" özelliği, mikrofrontend'lerin dinamik olarak yüklenmesini ve birleştirilmesini sağlar. Bu yöntem, modern projelerde yaygın olarak kullanılır.


### Mikrofrontend Araçları

-   **Single-SPA:** Mikrofrontend entegrasyonu için popüler bir çerçeve.
-   **Module Federation:** Webpack tabanlı dinamik yükleme için güçlü bir çözüm.
-   **qiankun:** Alibaba tarafından geliştirilen ve mikrofrontend entegrasyonu için kullanılan bir araç.
-   **FrintJS:** Mikrofrontend geliştirme için başka bir hafif kütüphane.


### Mikrofrontend Yapılandırma Örneği (Webpack Module Federation)

```javascript
// webpack.config.js
module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            name: "app1",
            filename: "remoteEntry.js",
            remotes: {
                app2: "app2@http://localhost:3002/remoteEntry.js",
            },
            exposes: {
                "./Header": "./src/Header",
            },
            shared: { react: { singleton: true }, "react-dom": { singleton: true } },
        }),
    ],
};
```


### Mikrofrontend ile İlgili Dikkat Edilmesi Gerekenler

1. **Performans:**

    - Parçaların sayısı arttıkça yükleme süresi uzayabilir. Bu nedenle iyi bir yükleme stratejisi uygulanmalıdır.

2. **Bağımlılık Yönetimi:**

    - Ortak bağımlılıkların farklı versiyonlarda çakışmasını önlemek için dikkat edilmelidir.

3. **Ekip İletişimi:**
    - Mikrofrontend ekipleri arasında güçlü bir koordinasyon sağlanmalıdır.
