package backend

import (
	"context"
	"io"
	"os"
	"path/filepath"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type FS struct {
	ctx context.Context
}

func NewFS() *FS {
	return &FS{}
}

func (f *FS) GetUserHomeDir() (string, error) {
	return os.UserHomeDir()
}

func (f *FS) IsDirEmpty(name string) bool {
	folder, err := os.Open(name)
	if err != nil {
		return true
	}
	defer folder.Close()

	_, err = folder.Readdir(1)

	if err == io.EOF {
		return true
	}
	return false
}

func (f *FS) GetDirName(path string) string {
	return filepath.Base(path)
}

func (f *FS) GetParentDir(path string) string {
	return filepath.Dir(path)
}

func (f *FS) Exists(dirPath string) bool {
	if _, err := os.Stat(dirPath); !os.IsNotExist(err) {
		return true
	}

	return false
}

func (f *FS) PathJoin(path1 string, path2 string) string {
	return filepath.Join(path1, path2)
}

func (f *FS) SetContext(ctx context.Context) {
	f.ctx = ctx
}

func (f *FS) OpenDirectoryDialog() (string, error) {
	return runtime.OpenDirectoryDialog(f.ctx, runtime.OpenDialogOptions{})
}
