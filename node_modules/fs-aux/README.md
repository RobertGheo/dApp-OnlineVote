**fs-aux** is a minimalistic modern fs API extension, not a drop-in, just very few extra "missing" functions. 

- Does not monkey-patch anything
- Uses native `fs/promises` (with the ups and the downs)
- Only async functions
- Uses `fast-glob` for glob
- ESM only

##  API

```ts 
import { saferRemove, glob, pathExists} from 'fs-aux';

// Will use fast-glob and then sort file paths 
let tsFiles = await glob('src/**/*.ts');

// Will remove only if child of ./ (by default) or throw error
await saferRemove('dist/');

// Will test if path "exists" (use fs/promises access and map try/catch to boolean
let distExists = await pathExists('dist/')
```

