import React, { useEffect, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const User = ({match}) => {

    const githubContext = useContext(GithubContext);

    const { user, getUser, loading, getUserRepos, repos} = githubContext;


    //replace componentDidMount to useEffect()
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        //disable useEffect warning on dependices
        //eslint-disable-next-line
    }, []); //empty[] makes it run once

    const { name, avatar_url, location, bio, blog, login, html_url, followers, company, following, public_repos, public_gists, hireable} = user;
        
    if (loading) {
            return <Spinner />
        } else {
            return (
                <Fragment>
                    <Link to='/' className="btn btn-light btn-circle"> Back to Home </Link>
                    Hireable: {''}
                    {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" />}
                    <div className="card grid-2">
                        <div className="all-center">
                        <img src={avatar_url} className="round-image" style={{ width: '150px' }} alt="" />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                        </div>
                        <div>
                            {bio && (<Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>)}
                            <a href={html_url} className="btn -btn-dark my-1">Visit Github Profile</a>

                            <ul>
                                <li>
                                    {login && (<Fragment>
                                        <strong>UserName: </strong>{login}
                                    </Fragment>)}
                                </li>

                                <li>
                                    {company && (<Fragment>
                                        <strong>Company: </strong>{company}
                                    </Fragment>)}
                                </li>


                                <li>
                                    {blog && (<Fragment>
                                        <strong>Website: </strong>{blog}
                                    </Fragment>)}
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className="card text-center">
                        <div className="badge badge-primary">Followers: {followers}</div>

                        <div className="badge badge-success">Following: {following}</div>

                        <div className="badge badge-danger">Public Repos: {public_repos}</div>

                        <div className="badge badge-dark">Public Gists: {public_gists}</div>
                    </div>
                    <div className="card">
                        <h2 className="text-center">User Repositories: </h2>
                    {/* repo component */}
                    <Repos repos={repos}/>
                    </div>
                </Fragment>
            )
        }
        
    }

export default User;