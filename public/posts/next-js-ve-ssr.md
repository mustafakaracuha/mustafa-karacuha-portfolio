![CI Süreci Şeması](https://camo.githubusercontent.com/0d58360e513e9867393ca45758e216610f498ac572ecd5b939d9d98676e026b2/68747470733a2f2f69302e77702e636f6d2f643630346836706b6b6f3972302e636c6f756466726f6e742e6e65742f77702d636f6e74656e742f75706c6f6164732f323032312f30332f32393131333734302f6e6578746a732d636f7665722d6a70672d776562702e776562703f6669743d313030302532433538322673736c3d31)


## Next.js ve SSR (Sunucu Tarafı Render)

Next.js, React tabanlı bir çerçevedir ve özellikle Sunucu Tarafı Render (SSR) desteği ile öne çıkar. SSR, bir web sayfasının HTML içeriğinin sunucuda oluşturulup tarayıcıya gönderilmesini sağlar. Bu yöntem, sayfa yüklenme hızını artırırken SEO performansını da önemli ölçüde iyileştirir.

### SSR Nedir?

SSR (Sunucu Tarafı Render), sayfa içeriğinin tarayıcıya gönderilmeden önce sunucuda oluşturulduğu bir yöntemdir. Bu yaklaşım, özellikle şu avantajları sağlar:

-   **Hızlı İlk Yükleme**: Tarayıcıya tamamen oluşturulmuş bir HTML sayfası gönderildiği için kullanıcılar daha hızlı bir deneyim yaşar.
-   **SEO İyileştirmesi**: Arama motorları için içerik, tarayıcı tarafında oluşturulmuş JavaScript yerine doğrudan HTML olarak sunulur.

![CI Süreci Şeması](https://media.licdn.com/dms/image/v2/D4D12AQGUSZEHKlzeYg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1663090913597?e=1740614400&v=beta&t=ZvYzf48fnzslVKNX3gxgrsBCH3EgwYm1cMEKZj8EmYg)

### CSR ve SSR Karşılaştırması

| Özellik              | CSR (Client-Side Rendering)                     | SSR (Server-Side Rendering)            |
| -------------------- | ----------------------------------------------- | -------------------------------------- |
| **İlk Yükleme Hızı** | Yavaş, tarayıcıda JavaScript çalıştırılır.      | Hızlı, HTML sunucuda hazırlanır.       |
| **SEO**              | Düşük, JavaScript'i işleyen botlara bağımlıdır. | Yüksek, HTML doğrudan sunulur.         |
| **Dinamik İçerik**   | Tarayıcıda güncellenir.                         | Sunucudan her istekle yenilenir.       |
| **Sunucu Yükü**      | Az, işlemler tarayıcıda yapılır.                | Fazla, her istekte içerik oluşturulur. |

### Next.js ile SSR Nasıl Kullanılır?

Next.js, `getServerSideProps` fonksiyonuyla SSR'ı kolayca etkinleştirmenizi sağlar. Bu yöntem, sayfa yüklenirken sunucudan veri çekmek için kullanılır.

### Örnek: API'den Veri Çekme

Aşağıdaki örnek, bir API'den veri alarak SSR ile sayfada görüntülemeyi sağlar:

```javascript
export async function getServerSideProps(context) {
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();

    return {
        props: { data }, // Sayfaya prop olarak aktarılır
    };
}

export default function Page({ data }) {
    return (
        <div>
            <h1>Sunucudan Gelen Veri</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
```

### Dinamik URL ile SSR

Next.js, dinamik rotaları SSR ile birlikte kullanmanıza olanak tanır. Örneğin, bir ürün detay sayfası oluşturmak için:

```javascript
export async function getServerSideProps({ params }) {
    const res = await fetch(`https://api.example.com/products/${params.id}`);
    const product = await res.json();

    return {
        props: { product },
    };
}

export default function ProductDetail({ product }) {
    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Fiyat: {product.price} TL</p>
        </div>
    );
}
```
