include ./kryptodian-frontend/.env

api-schema:
	@echo "Generating API schema"
	npx openapi-typescript@7.3.2 ${NEXT_PUBLIC_BACKEND_URL}/api/kryptodian_openapi.yaml -o kryptodian-frontend/src/schemas/api-schema.d.ts || \
	npx openapi-typescript@7.3.2 ${NEXT_PUBLIC_BACKEND_URL}/api/kryptodian_openapi.yaml -o kryptodian-frontend/src/schemas/api-schema.d.ts