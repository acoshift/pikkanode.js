build:
	docker build -t gcr.io/pikkanode/pikkanode .
push:
	docker push gcr.io/pikkanode/pikkanode
deploy: build push