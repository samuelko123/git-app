package backend

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestClone_HappyPath(t *testing.T) {
	git := NewGit("git")
	dir := getTempEmptyDir()
	repo := createRepo(t)

	err := git.Clone(repo, dir)

	assert.Nil(t, err)
}

func TestClone_NonEmptyDir(t *testing.T) {
	git := NewGit("git")
	dir := getTempNonEmptyDir(t)
	repo := createRepo(t)

	err := git.Clone(repo, dir)

	assert.EqualError(t, err, "Destination path '"+dir+"' already exists and is not an empty directory.")
}

func TestClone_GitNotFound(t *testing.T) {
	git := NewGit("no-git")
	dir := getTempEmptyDir()
	repo := createRepo(t)

	err := git.Clone(repo, dir)

	assert.EqualError(t, err, "\"no-git\": executable file not found in %PATH%")
}

func TestClone_RepoNotFound(t *testing.T) {
	git := NewGit("git")
	dir := getTempEmptyDir()
	repo := getTempEmptyDir()

	err := git.Clone(repo, dir)

	assert.EqualError(t, err, "Could not read from remote repository.\n\nPlease make sure you have the correct access rights\nand the repository exists.")
}

func getTempEmptyDir() string {
	return filepath.Join(os.TempDir(), uuid.NewString())
}

func getTempNonEmptyDir(t *testing.T) string {
	dir := getTempEmptyDir()
	err := os.Mkdir(dir, os.ModePerm)
	require.Nil(t, err)
	err = os.Mkdir(filepath.Join(dir, uuid.NewString()), os.ModePerm)
	require.Nil(t, err)
	return dir
}

func createRepo(t *testing.T) string {
	git := NewGit("git")
	dir := getTempEmptyDir()
	err := git.Init(dir)
	require.Nil(t, err)

	return dir
}
