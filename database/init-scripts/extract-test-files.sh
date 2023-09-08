ls -la /test

ls -la /docker-entrypoint-initdb.d/


chmod -R 777 /test

chmod +x /docker-entrypoint-initdb.d/extract-test-files.sh

echo "START SQL FILE DECOMPRESSION"
find /test -name "*.sql.tar.gz" -exec sh -c 'tar -xzvf {} -C /test' \;
echo "END SQL FILE DECOMPRESSION"
