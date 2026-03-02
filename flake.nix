{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.11";
  };

  outputs = { nixpkgs, ... }: let
    pkgs = import nixpkgs { inherit system; };
    system = "x86_64-linux";

    getVersion = versionString: builtins.splitVersion (builtins.replaceStrings ["^"] [""] versionString);

    node = rec {
      version = (getVersion (builtins.fromJSON (builtins.readFile ./package.json)).engines.node);
      pkgName = "nodejs_${builtins.elemAt version 0}";
    };

    php = rec {
      version = (getVersion (builtins.fromJSON (builtins.readFile ./composer.json)).config.platform.php);
      pkgName = "php${builtins.concatStringsSep "" version}";
    };
  in {
    devShells.${system}.default = pkgs.mkShell {
      packages = [
        pkgs.${node.pkgName}

        pkgs.${php.pkgName}
        pkgs."${php.pkgName}Packages".composer
      ];
    };
  };
}
