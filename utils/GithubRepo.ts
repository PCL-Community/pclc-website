export interface GithubRepo {
    id: number;
    name: string;
    stargazers_count: number;
    language: string;
    description: string;
    forks_count: string;
    updated_at: string;
    fork: boolean;
    default_branch: string;
    owner: Owner;
}

export interface Owner {
    login: string;
}

