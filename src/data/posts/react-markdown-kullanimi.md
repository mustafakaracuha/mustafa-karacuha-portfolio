![CI Süreci Şeması](https://refine-web.imgix.net/blog/2023-08-24-react-markdown/social-2.png?w=1788)

React Markdown, **Markdown formatındaki metinleri** kolayca işlemek ve görüntülemek için güçlü bir araçtır. Bloglar, teknik dokümantasyonlar ve dinamik içerikler sunan uygulamalarda sıkça kullanılır. Bu yazıda, React Markdown kütüphanesinin temel kullanımını ve özelliklerini detaylı bir şekilde ele alacağız.

### React Markdown Nedir?

React Markdown, React uygulamalarında Markdown metinlerini HTML olarak render eden bir kütüphanedir. Özellikle şu avantajları sunar:

-   Kolay kullanım
-   Esnek yapı
-   Farklı Markdown özelliklerini destekleme

### Nasıl Kurulur?

React Markdown kütüphanesini projenize dahil etmek için aşağıdaki komutu kullanabilirsiniz:

```bash
npm install react-markdown
```

Alternatif olarak Yarn kullanıyorsanız:

```bash
yarn add react-markdown
```

### Temel Kullanım

Bir React bileşeni içinde Markdown metni işlemek oldukça basittir. Örnek olarak aşağıdaki kodu inceleyelim:

```jsx
import React from "react";
import ReactMarkdown from "react-markdown";

const markdownContent = `
# Başlık 1
Bu bir **bold** kelime ve bu bir *italic* kelimedir.

- Liste Elemanı 1
- Liste Elemanı 2
- Liste Elemanı 3

[React Markdown GitHub](https://github.com/remarkjs/react-markdown)
`;

const MarkdownRenderer = () => {
    return <ReactMarkdown>{markdownContent}</ReactMarkdown>;
};

export default MarkdownRenderer;
```

### Çıktı

Bu kod çalıştırıldığında aşağıdaki gibi bir HTML çıktı elde edilir:

```html
<h1>Başlık 1</h1>
<p>Bu bir <strong>bold</strong> kelime ve bu bir <em>italic</em> kelimedir.</p>
<ul>
    <li>Liste Elemanı 1</li>
    <li>Liste Elemanı 2</li>
    <li>Liste Elemanı 3</li>
</ul>
<a href="https://github.com/remarkjs/react-markdown">React Markdown GitHub</a>
```

## Kod Blokları ve Sözdizimi Vurgulama

Markdown içinde kod bloklarını göstermek için üç backtick (```) kullanabilirsiniz. Sözdizimi vurgulama için react-syntax-highlighter kütüphanesiyle entegre edebilirsiniz.

### Örnek Kod Blokları

````jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const markdownWithCode = `
# Kod Örneği

JavaScript:
```javascript
const sayHello = () => {
    console.log('Merhaba Dünya!');
};
sayHello();
`````;

const MarkdownWithCode = () => {
return (
<ReactMarkdown
components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }} >
{markdownWithCode}
</ReactMarkdown>
);
};

export default MarkdownWithCode;

````

### Çıktı
Bu kod çalıştırıldığında, JavaScript kod bloğu vurgulanmış bir şekilde görüntülenir:

```javascript
const sayHello = () => {
    console.log('Merhaba Dünya!');
};
sayHello();
````

## Özel Bileşenlerle Özelleştirme

React Markdown, Markdown öğelerini özel React bileşenleriyle eşleştirme olanağı sunar.

```jsx
const markdownContent = `
# Özel Başlık

Bu bir özel paragraftır.
`;

const CustomComponents = {
    h1: ({ children }) => <h1 style={{ color: "blue" }}>{children}</h1>,
    p: ({ children }) => <p style={{ fontStyle: "italic" }}>{children}</p>,
};

const CustomMarkdownRenderer = () => {
    return <ReactMarkdown components={CustomComponents}>{markdownContent}</ReactMarkdown>;
};

export default CustomMarkdownRenderer;
```

### Çıktı

Bu örnek, başlıkları mavi, paragrafları italik olarak görüntüler.