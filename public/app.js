(function(){
	angular
		.module("BlogApp", [])
		.controller("BlogController", BlogController);

	function BlogController($scope, $http){
		$scope.createPost = createPost;
		$scope.deletePost = deletePost;
		$scope.editPost = editPost;
		$scope.updatePost = updatePost;

		//FUNCTIONS TO RUN WHEN PAGE FIRST LOADED (CONSTRUCTOR)
		function init(){
			getAllPosts();
		}
		init();

		function updatePost(post){
			console.log(post)
			$http
				.put("/api/blogpost/"+post._id, post)
				.success(getAllPosts)
		}

		//edit post function
		function editPost(postId){
			$http
				.get("api/blogpost/" + postId)
				.success(function(post){
					$scope.post = post;
				})
		}

		// gets all posts form server
		function getAllPosts(){
			$http
				.get("/api/blogpost")
				.success(function(posts){
					$scope.posts = posts;
				})
		}

		// creates a new post
		function createPost(post){
			console.log(post);
			$http
				.post("/api/blogpost", post)
				.success(getAllPosts)
		}

		//DELETE A POST
		function deletePost(postId){
			$http
				.delete("/api/blogpost/" + postId)
				.success(getAllPosts)
		}
	}

})();