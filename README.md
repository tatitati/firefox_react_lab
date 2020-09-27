To build, sign, publish and install locally:

```
cd public
web-ext sign --api-key=$issuer --api-secret=$secret
yarn build
```

Then:

```
Go to firefox -> 
    about:debugging -> 
        my firefox -> 
            load temporary addong ->
                select build/manifest.json
``` 

