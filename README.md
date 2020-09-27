To test locally:
```
npm install
npm run start
```

To build, sign, publish and install locally:
```
npm run-script build
cd public
web-ext sign --api-key=$issuer --api-secret=$secret
```

Then:

```
Go to firefox -> 
    about:debugging -> 
        my firefox -> 
            load temporary addong ->
                select build/manifest.json
``` 

