# =========================
# CONFIG
# =========================

PAGES_DIR := pages
LAYOUT_DIR := layout
ASSETS_DIR := assets
SCRIPTS_DIR := scripts
PUBLIC_DIR := public

BUILD_PAGE := $(SCRIPTS_DIR)/buildpage.sh

HTML_PAGES := $(shell find $(PAGES_DIR) -name "*.html")

# =========================
# COMMANDES
# =========================

.PHONY: all build clean rebuild assets pages

all: build

build: clean assets pages
	@echo "✅ Site généré dans ./public"

# =========================
# BUILD DES PAGES
# =========================

pages:
	@echo "📄 Génération des pages HTML..."
	@mkdir -p $(PUBLIC_DIR)
	@for page in $(HTML_PAGES); do \
		out=$${page#$(PAGES_DIR)/}; \
		mkdir -p $(PUBLIC_DIR)/$$(dirname $$out); \
		echo "  → $$out"; \
		$(BUILD_PAGE) $$page > $(PUBLIC_DIR)/$$out; \
	done

# =========================
# COPIE DES ASSETS
# =========================

assets:
	@echo "📦 Copie des assets..."
	@mkdir -p $(PUBLIC_DIR)
	@cp -r $(ASSETS_DIR) $(PUBLIC_DIR)/
	@cp -r $(PAGES_DIR)/boutique $(PUBLIC_DIR)/ || true

# =========================
# CLEAN
# =========================

clean:
	@echo "🧹 Nettoyage..."
	@rm -rf $(PUBLIC_DIR)

rebuild: clean build

