async function fetchAll() {
    let urls = [
        'http://www.omdbapi.com/?i=tt0138097&apikey=4686f3b9',
        'http://www.omdbapi.com/?i=tt2036416&apikey=4686f3b9'
    ]

    try {
      const data = await Promise.all(urls.map(url => fetch(url)));
      const ext = await Promise.all(data.map(res => res.json()));
      for (let item of ext) {
        console.log(item);
      }
    } catch (err) {
      console.log(err);
    }
  }

  fetchAll()