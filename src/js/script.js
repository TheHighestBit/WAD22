//Fetching JSON from a web endpoint
//let source = 'https://api.npoint.io/7c7e0a1e60249d73b459';
//Fetching JSON from local storage
let source = "../res/data.json";

window.onload = () => {
    fetch(source)
    .then((response) => response.json())
    .then((json_data) => {
        //Creating the necessary elements and adding their CSS classes
        let root = document.getElementById("middlecolumn");
        
        for (const iterator of json_data) {
            let post = document.createElement("div");
            post.classList.add("post");
            let postHeader = document.createElement("div");
            postHeader.classList.add("postheader");
            let postDate = document.createElement("span");
            postDate.classList.add("postdate");
            let likeButton = document.createElement("a");
            likeButton.classList.add("likebutton");

            let profileImage = document.createElement("img");
            profileImage.src = "res/img/profile.jpg";

            let likeImage = document.createElement("img");
            likeImage.src = "res/img/likebutton.svg";
            
            postHeader.appendChild(profileImage);

            postDate.innerHTML = iterator.date;
            postHeader.appendChild(postDate);
            
            post.appendChild(postHeader);

            if (iterator.image != null) { //If the post has an image
                let postImage = document.createElement("img");
                postImage.src = iterator.image;
                post.appendChild(postImage);
            }
            
            
            if (iterator.content != null) { //If the post has text
                let postText = document.createElement("p");
                postText.classList.add("posttext");
                postText.innerHTML = iterator.content;
                post.appendChild(postText);
            }
        
            likeButton.appendChild(likeImage);
            post.appendChild(likeButton);
        
            root.appendChild(post);
        }
    })
}