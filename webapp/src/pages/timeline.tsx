import React, { useState, useEffect } from "react";
import axios from 'axios';
import Footer from "@/components/footer/footer";

const API_ENDPOINT = `${process.env.API_BASE_URL}/api/v1/timeline`; // Adjust based on your actual API endpoint

export default function TimeLine(props: any) {
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_ENDPOINT, {
                params: {
                    page,
                    limit
                }
            });
            if (response.data && response.data.data) {
                setPosts(response.data.data);
                // Assuming the API returns total count or total pages information
                // Adjust based on actual API response structure
                const totalCount = response.data.total || response.data.data.length;
                setTotalPages(Math.ceil(totalCount / limit));
            } else {
                setPosts([]);
            }
        } catch (err) {
            setError('Failed to load timeline data. Please try again later.');
            console.error('Error fetching timeline data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        };
    };

    async function likePost(postId:string){
        const userData = JSON.parse((localStorage.getItem('userData') || "{}")) as any
        console.log(userData)

        const response = await axios.patch(API_ENDPOINT, {
                       userId:userData.username,
                       postId:postId,
                       action:'likes'
                    });
        alert('you liked the post')

        setPosts(
            posts.map((post) => {
                if (post.id === postId) {
                    return { ...post, likes: Number(post.likes) + 1 };
                }
                return post;
            })
        )
    }

    async function sharePost(postId:string,filePath:string){
        const userData = JSON.parse((localStorage.getItem('userData') || "{}")) as any
        const response = await axios.patch(API_ENDPOINT, {
                       userId:userData.username,
                       postId:postId,
                       action:'shares'
                    })
        posts.map((post) => {
            if (post.id === postId) {
                return { ...post, shares: Number(post.shares) + 1 };
            }
            return post;
        })
        navigator.clipboard.writeText(filePath);

        // copy user to clipboard

        
        alert('copied to clipboard');
    }
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Timeline</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && posts.length === 0 && <p>No posts available.</p>}
            {!loading && !error && posts.length > 0 && (
                <div>
                    {posts.map((post, index) => (
                        <div key={post.id || index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
                            {post.file_path && (
                                <img 
                                    src={post.file_path} 
                                    alt="Post content" 
                                    style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} 
                                />
                            )}
                            <p>{post.caption || 'No content available.'}</p>
                            <small>Posted on: {post.created_at || 'Unknown date'}</small>

                            <button  onClick={() => likePost(post?.id)}>Likes {post.likes}</button> 
                            <button  onClick={() => sharePost(post?.id,post.file_path)}>Shares {post.shares}</button>

                                                    </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <button 
                            onClick={() => handlePageChange(page - 1)} 
                            disabled={page === 1}
                            style={{ marginRight: '10px', padding: '5px 10px' }}
                        >
                            Previous
                        </button>
                        <span style={{ alignSelf: 'center' }}>Page {page} of {totalPages}</span>
                        <button 
                            onClick={() => handlePageChange(page + 1)} 
                            disabled={page === totalPages}
                            style={{ marginLeft: '10px', padding: '5px 10px' }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            <Footer/>
        </div>
    );
}
