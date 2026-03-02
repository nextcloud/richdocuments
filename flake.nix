{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.11";
  };

  outputs = { nixpkgs, ... }: let
    pkgs = import nixpkgs { inherit system; };
    system = "x86_64-linux";

    nodeVersion = builtins.replaceStrings ["^"] [""] (builtins.fromJSON (builtins.readFile ./package.json)).engines.node;
  in {
    devShells.${system}.default = pkgs.mkShell {
      packages = [
        pkgs."nodejs_${builtins.elemAt (builtins.splitVersion nodeVersion) 0}"
      ];
    };
  };
}
