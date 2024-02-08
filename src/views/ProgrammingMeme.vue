<template>
    <div class="memes">
        <h1>programming memes</h1>
        <div>
            <button style="margin-top: 10px;margin-bottom: 10px;" class="btn btn-sm btn-primary"
                @click="fetchData">Generate</button>
                <div class="row" v-if="fetchedData.length > 0">
                    <div class="card col-12 col-md-4" style="" v-for="article in shuffledFetchedData" :key="article.title">
                        <img class="card-img-top" :src="article.image" alt="Meme Image" style="height: 200px; object-fit: contain;">
                        <div class="card-body">
                            <h5 class="card-title">Meme</h5>
                            <p>Created: {{ article.created }}</p>
                            <p>Upvotes: {{ article.upvotes }}</p>
                            <p>Downvotes: {{ article.downvotes }}</p>
                            <p>Modified: {{ article.modified }}</p>
                        </div>
                        <div class="card-body">
                            <a target="_blank" :href="article.image" class="card-link">View meme</a>
                        </div>
                    </div>                    
                </div>
            <p v-else>No memes fetched yet.</p>
        </div>
    </div>
</template>
  
  

<script>
export default {
    props: {
        msg: String,
    },
    data() {
        return {
            fetchedData: [], // Initialize as an empty array
        };
    },
    methods: {
        fetchData() {
            fetch('https://programming-memes-images.p.rapidapi.com/v1/memes', {
                method: "GET",
                headers: {
                    'X-RapidAPI-Key': '4113cbec39mshcf11b1d912ad411p14e994jsn27f8488c373b',
                    'X-RapidAPI-Host': 'programming-memes-images.p.rapidapi.com'
                }
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    this.fetchedData = data.slice(0, 15); // Store first 10 articles
                    this.shuffleArticles(); // Shuffle the articles in place
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    this.fetchedData = []; // Clear data on error
                });
        },
        shuffleArticles() {
            // Shuffle the fetchedData array using the Fisher-Yates algorithm
            for (let i = this.fetchedData.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.fetchedData[i], this.fetchedData[j]] = [this.fetchedData[j], this.fetchedData[i]];
            }
        },
    },
    computed: {
        shuffledFetchedData() {
            return this.fetchedData; // Return the shuffled array
        },
    },
};

</script>

<style scoped>
.memes {
    padding-top: 20px;
}</style>
