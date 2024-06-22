import dtlpy as dl

def sso_login():
    if dl.login():
        return True

def external_login(email, password):
    if dl.login_m2m(email, password):
        return True