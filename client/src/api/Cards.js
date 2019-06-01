const BL_URL = '/api/';

export default {

   delete: function (id) {
      const requestUrl = BL_URL + 'cards/' + id;

      const requestOptions = {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json'
         }
      };

      return new Promise((resolve, reject) => {
         fetch(requestUrl, requestOptions)
            .then(res => {
               if (res.ok) {
                  console.log('Card deleted successfully');
                  resolve();
               } else {
                  console.log('Couldn\'t delete card');
                  reject();
               }
            })
            .catch(err => {
               console.log(err);
            });
      });
   },

   deleteAll: function () {
      const requestUrl = BL_URL + 'cards';

      const requestOptions = {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json'
         }
      };

      return new Promise((resolve, reject) => {
         fetch(requestUrl, requestOptions)
            .then(res => {
               if (res.ok) {
                  console.log('Cards deleted successfully');
                  resolve();
               } else {
                  console.log('Couldn\'t delete cards');
                  reject();
               }
            })
            .catch(err => {
               console.log(err);
            });
      });
   },

   edit: function (id, props) {
      const requestUrl = BL_URL + 'cards/' + id;

      const requestOptions = {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            'name': props.name,
            'age': props.age,
            'sex': props.sex,
            'bio': props.bio,
            'photo': props.photo
         })
      };

      return new Promise((resolve, reject) => {
         fetch(requestUrl, requestOptions)
            .then(res => {
               if (res.ok) {
                  console.log('Card updated successfully');
                  resolve();
               } else {
                  console.log('Couldn\'t update card');
                  reject();
               }
            })
            .catch(err => {
               console.log(err);
            });
      });
   },

   getAll: function () {
      let options = {
         method: 'GET',
         credentials: 'include',
         headers: {
            'cache-control': 'no-cache'
         }
      };

      return new Promise((resolve, reject) => {
         fetch(BL_URL + 'getAllCards', options)
            .then(res => res.json())
            .then(tasks => {
               resolve(tasks);
            })
            .catch(err => {
               console.log('Couldn\'t load cards');
               console.log(err);
               reject();
            })
      });
   },

   getMyCards: function () {
      let options = {
         method: 'GET',
         credentials: 'include',
         headers: {
            'cache-control': 'no-cache'
         }
      };

      return new Promise((resolve, reject) => {
         fetch(BL_URL + 'getMyCards', options)
            .then(res => res.json())
            .then(tasks => {
               resolve(tasks);
            })
            .catch(err => {
               console.log('Couldn\'t load cards');
               console.log(err);
               reject();
            })
      });
   },

   add: function (props) {

      return new Promise((resolve, reject) => {
         let data = new FormData();
         data.append("file", props.selectedPhoto);
         fetch(BL_URL + 'upload', {
            method: 'POST',
            credentials: 'include',
            body: data
         }).then(res => res.json())
            .then(img_path => {
               let opts = {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                     'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                     'name': props.name,
                     'sex': props.sex,
                     'age': props.age,
                     'bio': props.bio,
                     'img_path': img_path['message']
                  })
               };
               return opts;
            }).then((opts) => {
               fetch(BL_URL + 'cards', opts
               ).then(res => res.json())
                  .then(card => {
                     console.log('Card added successfully');
                     console.log(card);
                     resolve();
                  })
                  .catch(err => {
                     console.log(err);
                     reject();
                  })
            });
      })
   }
}