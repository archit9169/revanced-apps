# Revanced Apps
[![CI](https://img.shields.io/github/actions/workflow/status/archit9169/revanced-apps/ci.yml?label=CI&logo=github)](../../actions/workflows/ci.yml)
[![Latest Release](https://img.shields.io/github/v/release/archit9169/revanced-apps?label=Latest%20Release&logo=github)](../..//releases/latest)

<ul>
 <li>Support all present and future ReVanced and <a href="https://github.com/inotia00/revanced-patches">ReVanced Extended</a> apps</li>
 <li> Can build Magisk modules and non-root APKs</li>
 <li> Updated daily with the latest versions of apps and patches</li>
 <li> Optimize APKs and modules for size</li>
</ul>
Note that the <a href="../../actions/workflows/ci.yml">CI workflow</a> is scheduled to build the modules and APKs everyday using GitHub Actions if there is a change in ReVanced patches. You may want to disable it.

## To include/exclude patches or patch other apps

 * Star the repo :eyes:
 * Use the repo as a [template](https://github.com/new?template_name=revanced-magisk-module&template_owner=j-hc)
 * Customize [`config.toml`](./config.toml) using [rvmm-config-gen](https://j-hc.github.io/rvmm-config-gen/)
 * Run the build [workflow](../../actions/workflows/build.yml)
 * Grab your modules and APKs from [releases](../../releases)

also see here [`CONFIG.md`](./CONFIG.md)

## Building Locally
### On Termux
```console
bash <(curl -sSf https://raw.githubusercontent.com/j-hc/revanced-magisk-module/main/build-termux.sh)
```

### On Desktop
```console
$ git clone https://github.com/j-hc/revanced-magisk-module
$ cd revanced-magisk-module
$ ./build.sh
```
