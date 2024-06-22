import dtlpy as dl

def get_projects():
    try:
        projects = []  # Lista para armazenar projetos
        # Implementação fictícia, substitua pela lógica real
        for project in dl.projects.list():
            projects.append(project.name)
        print(f"Projetos encontrados: {projects}")  # Log de depuração
        return projects
    except Exception as e:
        print(f"Erro ao buscar projetos: {e}")  # Log de erro
        raise e

def get_datasets(project_name):
    try:
        datasets = []  # Lista para armazenar datasets
        # Implementação fictícia, substitua pela lógica real
        project = dl.projects.get(project_name=project_name)
        for dataset in project.datasets.list():
            datasets.append(dataset.name)
        print(f"Datasets encontrados para o projeto {project_name}: {datasets}")  # Log de depuração
        return datasets
    except Exception as e:
        print(f"Erro ao buscar datasets para o projeto {project_name}: {e}")  # Log de erro
        raise e
