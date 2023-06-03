package main

import (
	"embed"

	"github.com/samueko123/git-app/backend"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	fs := backend.NewFS()
	git := backend.NewGit("git")

	// Create application with options
	err := wails.Run(&options.App{
		Title:             "Git App",
		DisableResize:     false,
		Fullscreen:        false,
		Frameless:         false,
		StartHidden:       false,
		HideWindowOnClose: false,
		AlwaysOnTop:       false,
		OnStartup:         fs.SetContext,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		Bind: []interface{}{
			git,
			fs,
		},
		WindowStartState: options.Maximised,
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
