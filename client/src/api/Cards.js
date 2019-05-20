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
                  console.log('Task deleted successfully');
                  resolve();
               } else {
                  console.log('Couldn\'t delete task');
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
            'name' : props.name,
            'sex' : props.sex,
            'age' : props.age,
            'bio' : props.bio
         })
      };

      return new Promise((resolve, reject) => {
         fetch(requestUrl, requestOptions)
            .then(res => {
               if (res.ok) {
                  console.log('Task updated successfully');
                  resolve();
               } else {
                  console.log('Couldn\'t update task');
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
               console.log('Couldn\'t load tasks');
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
               console.log('Couldn\'t load tasks');
               console.log(err);
               reject();
            })
      });
   },

   add: function (props) {
      let options = {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            'name' : props.name,
            'sex' : props.sex,
            'age' : props.age,
            'bio' : props.bio
         })
      };

      return new Promise((resolve, reject) => {
         fetch(BL_URL + 'cards', options)
            .then(res => res.json())
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
   }
}