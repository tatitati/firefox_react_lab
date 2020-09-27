To build, sign, publish and install locally:

```
yarn build
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

