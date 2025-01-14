![CI Süreci Şeması](https://media2.dev.to/dynamic/image/width=1280,height=720,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fsk3vdofe7r7r5wax1scb.png)

React uygulamalarında durum yönetimi, büyük ve karmaşık projelerde önemli bir yer tutar. React, bileşen bazlı yapı sayesinde UI'nin hızlı ve verimli bir şekilde güncellenmesini sağlar, ancak uygulama büyüdükçe bileşenler arası durum (state) yönetimi karmaşık hale gelebilir. İşte bu noktada Redux devreye girer. Redux, uygulama durumunu merkezi bir yerde tutarak, tüm bileşenler arasında veri paylaşımını kolaylaştırır.

### Redux Nedir?

Redux, JavaScript uygulamaları için açık kaynaklı bir durum yönetim kütüphanesidir. Redux'un temel amacı, tüm uygulamanın durumunu merkezi bir "store"da saklayarak, bileşenlerin durum bilgisini daha kontrollü bir şekilde yönetmektir.

### Redux'un Temel Kavramları

Redux'un üç ana bileşeni vardır:

1. **Store**: Uygulamanın tüm durum bilgisini içeren bir JavaScript nesnesidir. Store, uygulamanın global durumunu temsil eder ve bileşenler arası veri akışını yönetir.
   
2. **Action**: Durumda yapılacak bir değişikliği tanımlar. Action, bir tür (type) ve isteğe bağlı olarak yük (payload) içeren bir nesnedir.
   
3. **Reducer**: Store'daki durumu değiştiren saf fonksiyonlardır. Reducer'lar, her bir action'ı alır ve store'daki durumu günceller.

### Redux ve React Entegrasyonu

React ile Redux'u entegre etmek için, `react-redux` kütüphanesini kullanabiliriz. Bu kütüphane, React bileşenlerinin Redux store'u ile etkileşim kurmasını sağlar. İşte temel adımlar:

#### 1. Redux Store'u Oluşturmak

Öncelikle, uygulamanın durumunu yönetmek için bir store oluşturmalıyız. Store, tüm reducer'ları birleştiren bir yapı olmalıdır.

```javascript
// store.js
import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

export default store;
```

![CI Süreci Şeması](https://lh7-us.googleusercontent.com/gBH2Ox4ahs9p1mgN9W2jHwTe_lGCp7Asfeo-qLkhb03hTpCo7vhy2JAbytn9mPuizT3DreqGK6cl2TdUMo0SVI74rKBkKqRKL4dqxz6RARQU3vufDDscq92Ig72VfltswXCXwcMGDDvJvGJDECLnuf1pSyxCJxSQXf5gnHWjS9Je5VCpgw5ea_7HBXg5hg)

#### 2. Reducer Fonksiyonları

Reducer, bir action alarak mevcut durumu günceller. Her reducer, belirli bir durumu günceller.

```javascript
// reducers.js
const initialState = {
  counter: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

export default counterReducer;
```

#### 3. Action'lar

Action, store'daki durumu değiştiren olaylardır. Bu olaylar genellikle bir kullanıcı etkileşimi ile tetiklenir.

```javascript
// actions.js
export const increment = () => ({
  type: "INCREMENT",
});

export const decrement = () => ({
  type: "DECREMENT",
});
```

![CI Süreci Şeması](https://css-tricks.com/wp-content/uploads/2016/03/redux-article-3-03.svg)

#### 4. React Bileşenine Redux Bağlamak

React bileşenini Redux store'u ile bağlamak için `useSelector` ve `useDispatch` hook'larını kullanabiliriz.

```javascript
// Counter.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./actions";

const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => dispatch(increment())}>Arttır</button>
      <button onClick={() => dispatch(decrement())}>Azalt</button>
    </div>
  );
};

export default Counter;
```

#### 5. React-Redux Provider ile Uygulamayı Sarma

Son olarak, Redux store'u uygulamaya bağlamak için `Provider` bileşenini kullanırız.

```javascript
// App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Counter from "./Counter";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>React ve Redux ile Durum Yönetimi</h1>
        <Counter />
      </div>
    </Provider>
  );
};

export default App;
```

### Redux'un Avantajları

1. **Tek Kaynak Doğruluğu (Single Source of Truth)**: Uygulamanın tüm durumu merkezi bir store'da saklanır. Bu, uygulamanın tüm verisinin tek bir yerde yönetilmesini sağlar.
   
2. **Öngörülebilirlik**: Redux, durumu saf fonksiyonlar (reducer'lar) ile günceller. Bu sayede uygulama davranışı daha öngörülebilir hale gelir.

3. **Kolay Test Edilebilirlik**: Redux, saf fonksiyonlarla çalıştığı için, uygulama bileşenlerini ve reducer'ları test etmek daha kolaydır.

4. **Gelişmiş Debugging**: Redux DevTools gibi araçlar sayesinde uygulamanın durumu anlık olarak izlenebilir ve geçmişteki eylemler gözlemlenebilir.

5. **Uygulama Performansı**: Redux, uygulama durumu üzerinde merkezi bir kontrol sağladığı için, büyük ölçekli uygulamalarda performans optimizasyonlarına olanak tanır.

### Redux ile En İyi Uygulamalar

- **Reducer'lar Modüler Olmalı**: Uygulamanın durumunu modüler bir şekilde yönetmek, kodun bakımını ve genişletilebilirliğini artırır.
- **Eylemleri (Actions) Anlamlı Yapın**: Eylem türlerini anlamlı ve açıklayıcı tutmak, kodun anlaşılabilirliğini artırır.
- **Component-Driven State yerine Redux**: React bileşenlerinin durum yönetimi için yerel state kullanmak yerine, global state için Redux kullanmak büyük projelerde daha yönetilebilir sonuçlar verir.
